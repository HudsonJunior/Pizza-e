import React from "react"
import TextField from "@material-ui/core/TextField"

const Observacoes = () => {
    return (
        <div className="RPCampos">
              <TextField
                id="txtFieldObs"
                label="Observações"
                multiline
                rows={2}
              />
            </div>
    )
}

export default Observacoes