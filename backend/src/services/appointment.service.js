import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import Service from "../models/service.model.js";
import Schedule from "../models/schedule.model.js";


const getDayName = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

const canManageAppointment = (appointment, user) => {
  const appointmentUserId = appointment.userId._id
    ? appointment.userId._id.toString()
    : appointment.userId.toString();

  return (
    user.role === "admin" ||
    appointmentUserId === user.id.toString()
  );
};

// export const createAppointment = async (appointmentData) => {
//   const {
//     userId,
//     serviceId,
//     scheduleId,
//     appointmentDate,
//     notes,
//   } = appointmentData;

//   // Vérifier que le patient existe
//   const user = await User.findById(userId);

//   if (!user) {
//     throw new Error("Patient not found");
//   }

//   // Vérifier que le service existe
//   const service = await Service.findById(serviceId);

//   if (!service) {
//     throw new Error("Service not found");
//   }

//   // Vérifier que le schedule existe
//   const schedule = await Schedule.findById(scheduleId);

//   if (!schedule) {
//     throw new Error("Schedule not found");
//   }

//   // Vérifier que le schedule est disponible
//   if (!schedule.isAvailable) {
//     throw new Error("This schedule is not available");
//   }

//   const date = new Date(appointmentDate);

//   // Vérifier que la date est valide
//   if (isNaN(date.getTime())) {
//     throw new Error("Invalid appointment date");
//   }

//   // Vérifier le jour de la semaine
//   const appointmentDay = getDayName(date);

//   if (appointmentDay !== schedule.day) {
//     throw new Error(
//       `Appointment date must be on ${schedule.day}`
//     );
//   }

// // Vérifier que l'heure du rendez-vous est dans le planning
// const appointmentMinutes =
//   date.getHours() * 60 + date.getMinutes();

// const startMinutes = timeToMinutes(schedule.startTime);
// const endMinutes = timeToMinutes(schedule.endTime);

// if (
//   appointmentMinutes < startMinutes ||
//   appointmentMinutes >= endMinutes
// ) {
//   throw new Error(
//     `Appointment time must be between ${schedule.startTime} and ${schedule.endTime}`
//   );
// }

// // Vérifier qu'il n'existe pas déjà un rendez-vous
// // pour ce patient à cette date
// const existingAppointment = await Appointment.findOne({
//   userId,
//   appointmentDate: date,
//   status: {
//     $in: ["pending", "confirmed"],
//   },
// });


//   if (existingAppointment) {
//     throw new Error(
//       "You already have an appointment at this date"
//     );
//   }

//   // Création du rendez-vous
//   const appointment = await Appointment.create({
//     userId,
//     serviceId,
//     scheduleId,
//     appointmentDate: date,
//     notes,
//     status: "pending",
//   });

//   return appointment;
// };


export const createAppointment = async (appointmentData) => {
  const {
    userId,
    serviceId,
    scheduleId,
    appointmentDate,
    notes,
  } = appointmentData;


  // 1. Vérifier que le patient existe
 

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Patient not found");
  }


  // 2. Vérifier que le service existe


  const service = await Service.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

 
  // 3. Vérifier que le schedule existe
  

  const schedule = await Schedule.findById(scheduleId);

  if (!schedule) {
    throw new Error("Schedule not found");
  }


  // 4. Vérifier que le schedule est disponible


  if (!schedule.isAvailable) {
    throw new Error("This schedule is not available");
  }


  // 5. Vérifier la date


  const date = new Date(appointmentDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid appointment date");
  }

  // 6. Vérifier le jour


  const appointmentDay = getDayName(date);

  if (appointmentDay !== schedule.day) {
    throw new Error(
      `Appointment date must be on ${schedule.day}`
    );
  }


  // 7. Calculer heure début


  const appointmentStartMinutes =
    date.getHours() * 60 + date.getMinutes();

  const scheduleStartMinutes =
    timeToMinutes(schedule.startTime);

  const scheduleEndMinutes =
    timeToMinutes(schedule.endTime);


  // 8. Calculer heure fin selon service.duration
 

  const appointmentEndMinutes =
    appointmentStartMinutes + service.duration;


  // 9. Vérifier que le rendez-vous complet
  //    reste dans les horaires du cabinet
 

  if (
    appointmentStartMinutes < scheduleStartMinutes ||
    appointmentEndMinutes > scheduleEndMinutes
  ) {
    throw new Error(
      `Appointment must be between ${schedule.startTime} and ${schedule.endTime}`
    );
  }


  // 10. Récupérer les appointments du même jour
 

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingAppointments = await Appointment.find({
    appointmentDate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },

    status: {
      $in: ["pending", "confirmed"],
    },
  }).populate("serviceId");

  // 11. Vérifier les conflits horaires
 

  const hasConflict = existingAppointments.some(
    (appointment) => {
      const existingStartMinutes =
        appointment.appointmentDate.getHours() * 60 +
        appointment.appointmentDate.getMinutes();

      const existingEndMinutes =
        existingStartMinutes +
        appointment.serviceId.duration;

      // Overlap entre les deux rendez-vous
      return (
        appointmentStartMinutes < existingEndMinutes &&
        appointmentEndMinutes > existingStartMinutes
      );
    }
  );

  if (hasConflict) {
    throw new Error(
      "This time slot is already booked"
    );
  }


  // 12. Vérifier que le même patient
  //     n'a pas déjà un rendez-vous qui se chevauche


  const patientAppointments =
    existingAppointments.filter(
      (appointment) =>
        appointment.userId.toString() ===
        userId.toString()
    );

  const patientHasConflict =
    patientAppointments.some((appointment) => {
      const existingStartMinutes =
        appointment.appointmentDate.getHours() * 60 +
        appointment.appointmentDate.getMinutes();

      const existingEndMinutes =
        existingStartMinutes +
        appointment.serviceId.duration;

      return (
        appointmentStartMinutes < existingEndMinutes &&
        appointmentEndMinutes > existingStartMinutes
      );
    });

  if (patientHasConflict) {
    throw new Error(
      "You already have an appointment during this time"
    );
  }


  // 13. Créer le rendez-vous

  const appointment = await Appointment.create({
    userId,
    serviceId,
    scheduleId,
    appointmentDate: date,
    notes,
    status: "pending",
  });

  return appointment;
};



export const getAllAppointments = async () => {
  const appointments = await Appointment.find()
    .populate("userId", "firstName lastName email phone")
    .populate("serviceId", "name description duration price")
    .populate(
      "scheduleId",
      "day startTime endTime isAvailable"
    )
    .sort({ appointmentDate: 1 });

  return appointments;
};

export const getAppointmentById = async (
  appointmentId,
  user
) => {
  const appointment = await Appointment.findById(
    appointmentId
  )
    .populate("userId", "firstName lastName email phone")
    .populate(
      "serviceId",
      "name description duration price"
    )
    .populate(
      "scheduleId",
      "day startTime endTime isAvailable"
    );

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (!canManageAppointment(appointment, user)) {
    throw new Error("Access denied");
  }

  return appointment;
};
export const getAppointmentsByUser = async (userId) => {
  const appointments = await Appointment.find({
    userId,
  })
    .populate("serviceId", "name description duration price")
    .populate(
      "scheduleId",
      "day startTime endTime isAvailable"
    )
    .sort({ appointmentDate: 1 });

  return appointments;
};

export const updateAppointment = async (
  appointmentId,
  appointmentData,
  user
) => {
  const appointment = await Appointment.findById(
    appointmentId
  );

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (!canManageAppointment(appointment, user)) {
    throw new Error("Access denied");
  }

  const updatedAppointment =
    await Appointment.findByIdAndUpdate(
      appointmentId,
      appointmentData,
      {
        new: true,
        runValidators: true,
      }
    );

  return updatedAppointment;
};

export const deleteAppointment = async (
  appointmentId,
  user
) => {
  const appointment = await Appointment.findById(
    appointmentId
  );

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (!canManageAppointment(appointment, user)) {
    throw new Error("Access denied");
  }

  await Appointment.findByIdAndDelete(appointmentId);

  return appointment;
};