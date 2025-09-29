import { useForm } from "react-hook-form";
import type { IPlatforme } from "../../services/interface/IPlatform";
import { createPlateform } from "../../services/api/platform";
import { useCallback } from "react";

import React from "react";

const AddPlatform = ({ isOpen, onClose, onCreated }) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPlatforme>({ defaultValues: { name: "", maker: "Sega" } });

  const onSubmitPlatforme = useCallback(
    async (formData: IPlatforme) => {
      console.log(formData);
      const created = await createPlateform(formData);
      onCreated?.(created ?? formData);
      onClose();
    },
    [onCreated, onClose]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white shadow-xl outine-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b p-5">
          <h1 className="text-2xl font-bold">Add Platforme</h1>
        </div>
        <div
          className="grid gap-6 p-5"
          onSubmit={handleSubmit(onSubmitPlatforme)}
        >
          <div className="grid gap-1.5">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="border-2 border-black rounded-lg p-2"
              {...register("name")}
            />
            {errors.name && <p>This is an error</p>}

            <label htmlFor="image">Marke</label>
            <select className="input-type-console" {...register("marke")}>
              <option value="Nintendo">Nintendo</option>
              <option value="Sega">Sega</option>
              <option value="Sony">Sony</option>
              <option value="Microsoft">Microsoft</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(onSubmitPlatforme)()}
              className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlatform;
