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

export const createAppointment = async (appointmentData) => {
  const {
    userId,
    serviceId,
    scheduleId,
    appointmentDate,
    notes,
  } = appointmentData;

  // Vérifier que le patient existe
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Patient not found");
  }

  // Vérifier que le service existe
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  // Vérifier que le schedule existe
  const schedule = await Schedule.findById(scheduleId);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  // Vérifier que le schedule est disponible
  if (!schedule.isAvailable) {
    throw new Error("This schedule is not available");
  }

  const date = new Date(appointmentDate);

  // Vérifier que la date est valide
  if (isNaN(date.getTime())) {
    throw new Error("Invalid appointment date");
  }

  // Vérifier le jour de la semaine
  const appointmentDay = getDayName(date);

  if (appointmentDay !== schedule.day) {
    throw new Error(
      `Appointment date must be on ${schedule.day}`
    );
  }

// Vérifier que l'heure du rendez-vous est dans le planning
const appointmentMinutes =
  date.getHours() * 60 + date.getMinutes();

const startMinutes = timeToMinutes(schedule.startTime);
const endMinutes = timeToMinutes(schedule.endTime);

if (
  appointmentMinutes < startMinutes ||
  appointmentMinutes >= endMinutes
) {
  throw new Error(
    `Appointment time must be between ${schedule.startTime} and ${schedule.endTime}`
  );
}

// Vérifier qu'il n'existe pas déjà un rendez-vous
// pour ce patient à cette date
const existingAppointment = await Appointment.findOne({
  userId,
  appointmentDate: date,
  status: {
    $in: ["pending", "confirmed"],
  },
});


  if (existingAppointment) {
    throw new Error(
      "You already have an appointment at this date"
    );
  }

  // Création du rendez-vous
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