import React from "react"
import TextField from "@material-ui/core/TextField"
import { useEffect } from "react"

const Observacoes = props => {

  const [observacoes, setObservacoes] = React.useState("nenhuma")

  useEffect(() => {
    setObservacoes("nenhuma")
  }, [])

    return (
        <div className="RPCampos">
              <TextField
                id="txtFieldObs"
                label="Observações"
                multiline
                value={observacoes}
                onChange={event => setObservacoes(event.target.value)}
                rows={2}
              />
            </div>
    )
}

export default Observacoes