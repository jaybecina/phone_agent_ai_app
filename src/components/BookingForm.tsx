import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const bookingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(1, { message: "Mobile number is required" }),
  branch: z.string().min(1, { message: "Branch selection is required" }),
  service: z.string().min(1, { message: "Service selection is required" }),
  hairLength: z
    .string()
    .min(1, { message: "Hair length selection is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time selection is required" }),
  remarks: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="md:max-w-lg md:mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        BOOK AN APPOINTMENT
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name*
          </label>
          <input
            id="name"
            {...register("name")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address*
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile Number*
          </label>
          <input
            id="mobile"
            {...register("mobile")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.mobile && (
            <span className="text-red-500 text-sm">
              {errors.mobile.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Branch*
          </label>
          <select
            id="branch"
            {...register("branch")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Please choose an option</option>
            <option value="manila">Manila Branch</option>
            <option value="makati">Makati Branch</option>
            <option value="quezon">Quezon City Branch</option>
          </select>
          {errors.branch && (
            <span className="text-red-500 text-sm">
              {errors.branch.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700"
          >
            Service*
          </label>
          <select
            id="service"
            {...register("service")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Please choose an option</option>
            <option value="haircut">Haircut</option>
            <option value="color">Hair Color</option>
            <option value="treatment">Hair Treatment</option>
          </select>
          {errors.service && (
            <span className="text-red-500 text-sm">
              {errors.service.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="hairLength"
            className="block text-sm font-medium text-gray-700"
          >
            Select your Hair length*
          </label>
          <select
            id="hairLength"
            {...register("hairLength")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Please choose an option</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
          {errors.hairLength && (
            <span className="text-red-500 text-sm">
              {errors.hairLength.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Date to Visit*
          </label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.date && (
            <span className="text-red-500 text-sm">{errors.date.message}</span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Time to Visit*
          </label>
          <select
            id="time"
            {...register("time")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Choose your prefer time to visit</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
          </select>
          {errors.time && (
            <span className="text-red-500 text-sm">{errors.time.message}</span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="remarks"
            className="block text-sm font-medium text-gray-700"
          >
            Special Remarks
          </label>
          <textarea
            id="remarks"
            {...register("remarks")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
