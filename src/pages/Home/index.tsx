import { Play } from "phosphor-react"
import { useState } from "react"
import * as C from "./styles"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  console.log(formState.errors)

  const task = watch("task")
  const isSubmitDisabled = !task

  return (
    <C.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <C.FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <C.TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
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
          />

          <span>minutos.</span>
        </C.FormContainer>

        <C.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <C.Separator>:</C.Separator>
          <span>0</span>
          <span>0</span>
        </C.CountdownContainer>

        <C.StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </C.StartCountdownButton>
      </form>
    </C.HomeContainer>
  )
}
