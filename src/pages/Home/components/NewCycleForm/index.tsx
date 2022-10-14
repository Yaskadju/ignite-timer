import * as C from "./styles"
import * as zod from "zod"
import { useContext } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CyclesContext } from "../.."

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <C.FormContainer>
      <label htmlFor="">Vou trabalhar em</label>
      <C.TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register("task")}
        disabled={Boolean(activeCycle)}
      />

      <datalist id="task-suggestions">
        <option value="projeto0" />
        <option value="projeto1" />
        <option value="projeto2" />
        <option value="projeto3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <C.MinutesAmountInput
        step={5}
        min={5}
        max={120}
        type="number"
        id="minutesAmount"
        placeholder="00"
        {...register("minutesAmount", { valueAsNumber: true })}
        disabled={Boolean(activeCycle)}
      />

      <span>minutos.</span>
    </C.FormContainer>
  )
}
