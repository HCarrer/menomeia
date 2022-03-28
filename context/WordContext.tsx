import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IBGE_URL } from "../constants/urls";
import { IWordContext } from "../interfaces/wordContext";

const wordContextDefaultValues: IWordContext = {
  decade: undefined,
  setGivenDecade: (decade: number) => {
    return
  },
  setRandomWordByDecade: (decade: number) => {
    return []
  },
  startContext: () => {
    return
  }
}

const WordContext = createContext<IWordContext>(wordContextDefaultValues)

export function useWord(): IWordContext {
  return useContext(WordContext)
}

type Props = {
  children: ReactNode
}

export function WordProvider({ children }: Props): JSX.Element {

  const [word, setWord] = useState<string>()
  const [brokenWord, setBrokenWord] = useState([{}])
  const [decade, setDecade] = useState<number>(0)

  const getRandomNumber = () => {
    const min = Math.ceil(0);
    const max = Math.floor(19);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const breakWord = (name:string) => {
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

  const setRandomWordByDecade = (decade: number) => {
    setDecade(decade)
    console.log('teste')
    const randomNumber = getRandomNumber()
    axios.get(IBGE_URL + '?decada=' + decade)
    .then((data: AxiosResponse) => {
      setWord(data.data[0].res[randomNumber].nome)
    })
    setBrokenWord(breakWord(word))
    return brokenWord
  }

  const setGivenDecade = (decade: number) => {
    console.log(decade, 'dadadasd')
    setDecade(decade)
  }

  const startContext = () => {
    console.log('starting context')
    setWord('')
    setBrokenWord([{letter: '', id: 0}])
    setGivenDecade(1930)
  }

  const value = {
    setRandomWordByDecade,
    setGivenDecade,
    decade,
    startContext
  }

  return (
    <>
      <WordContext.Provider value={value}>{children}</WordContext.Provider>
    </>
  )
}