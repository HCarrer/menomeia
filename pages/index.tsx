import axios, {AxiosResponse} from 'axios';
import { useEffect, useState } from 'react';
import { IBGE_URL } from '../constants/urls';

export default function Home() {
  const [decade, setDecade] = useState(1940)
  const [name, setName] = useState("")
  const [brokenWord, setBrokenWord] = useState([])

  const tries = [
    {
      word: brokenWord,
      id: 1
    }
  ]

  const breakName = (name:string) => {
    const vector = []
    name.split('').map((letter, index) => {
      const entity = {
        letter: letter,
        id: index
      }
      vector.push(entity)
    })
    return vector
  }

  useEffect(() => {
    axios.get(IBGE_URL + '?decada=' + decade)
    .then((data: AxiosResponse) => {
      console.log(data.data[0].res[5].nome);
      setName(data.data[0].res[5].nome)
    })
    setBrokenWord(breakName(name))
  },[decade, name])

  const handleSubmit = (event) => {
    setDecade(event.target.value)
  }

  return (
    <>
    <div>
      <form onClick={handleSubmit}>
        <input type="number" min="1930" max="2010" step="10" defaultValue={decade}></input>
        <button type="button">Selecionar decada</button>
      </form>
    </div>
      <div className="border">
        <span>{name}</span>
        {tries.map((option) => {
          console.log(option)
          return (
            <div key={option.id} className="flex flex-row gap-x-3 mb-3 items-center">
              {option.word.map((letter) => {
                return (
                <div key={letter.id} className="flex w-16 h-16 border-4 rounded-lg justify-center items-center">
                  <span className="text-xl">{letter.letter}</span>
                </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
