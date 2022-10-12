import { HandPalm, Play } from "phosphor-react"
import { useEffect, useState } from "react"
import * as C from "./styles"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { differenceInSeconds } from "date-fns"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if (secondsDifference >= totalSeconds) {
          setCycles(state =>
            state.map(cycle => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            })
          )

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    // o return vai resetar os intervalos após a criação de um novo ciclo
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds])

  function handleInterruptCycle() {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    // sempre que uma alteração de estado depender do valor alterior, usar arrow function
    setCycles(state => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  console.log({ activeCycle })
  console.log(formState.errors)

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch("task")
  const isSubmitDisabled = !task

  console.log({ cycles })

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

        <C.CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <C.Separator>:</C.Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </C.CountdownContainer>

        {activeCycle ? (
          <C.StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </C.StopCountdownButton>
        ) : (
          <C.StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </C.StartCountdownButton>
        )}
      </form>
    </C.HomeContainer>
  )
}
