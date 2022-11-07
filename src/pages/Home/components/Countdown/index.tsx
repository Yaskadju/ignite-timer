import { differenceInSeconds } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { CyclesContext } from "../../../../contexts/CyclesContext"
import * as C from "./styles"

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    amountSecondsPassed
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    // o return vai resetar os intervalos após a criação de um novo ciclo
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <C.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <C.Separator>:</C.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </C.CountdownContainer>
  )
}
