import * as C from "./styles"

export function History() {
  return (
    <C.HistoryContainer>
      <h1>Meu histórico</h1>

      <C.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tarefa1</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <C.Status statusColor="green">Concluído</C.Status>
              </td>
            </tr>
            <tr>
              <td>tarefa1</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <C.Status statusColor="green">Concluído</C.Status>
              </td>
            </tr>
            <tr>
              <td>tarefa1</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <C.Status statusColor="green">Concluído</C.Status>
              </td>
            </tr>
            <tr>
              <td>tarefa1</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <C.Status statusColor="green">Concluído</C.Status>
              </td>
            </tr>
          </tbody>
        </table>
      </C.HistoryList>
    </C.HistoryContainer>
  )
}
