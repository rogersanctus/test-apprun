import { app, Component } from "apprun"

import style from "./main.scss"

interface FormData {
  name: string | null
  age: number | null
  birthDate: string | null
  date?: string | null
}

interface HasValue {
  value: string | null
}

const UserRegisterItem = ({ value }: HasValue) => <li>{value}</li>

class UserRegister extends Component {
  state: FormData = {
    name: null,
    age: null,
    birthDate: null,
    get date() {
      if (!this.birthDate) {
        return null
      }

      return new Date(this.birthDate + "T00:00:00").toLocaleDateString()
    }
  }

  view = (state: FormData) => {
    return (
      <>
        <style>{style}</style>
        <div id="component">
          <form>
            <div className="form-group">
              <label for="name">Name:</label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                $bind={"name"}
                autofocus
              />
            </div>
            <div className="form-group">
              <label for="age">Age:</label>
              <input name="age" type="number" placeholder="Age" $bind={"age"} />
            </div>

            <div className="form-group">
              <label for="birth-date">Birth date:</label>
              <input
                name="birth-date"
                placeholder="dd-mm-yyyy"
                type="date"
                $bind={"birthDate"}
              />
            </div>
          </form>
          <div>
            <h4>Confirm your data:</h4>
            <ul>
              {Object.keys(state)
                .filter((key) => key !== "birthDate")
                .map((key) => {
                  if (state[key]) {
                    return <UserRegisterItem value={state[key]} />
                  }
                })}
            </ul>
          </div>
        </div>
      </>
    )
  }

  update = {}
}

app.render(document.body, <UserRegister />)
