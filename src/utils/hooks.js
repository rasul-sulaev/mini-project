import {useEffect, useState} from "react";
import bgImg from "../assets/img/bg_.jpg";

/**
 *
 * **/
export const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} / Мини проект`;
  }, [title])
}

/**
 *
 * **/
export const useInput = (initialValue, required) => {
  const [value, setValue] = useState(initialValue);
  const [isEmpty, setIsEmpty] = useState(false);

  return {
    isEmpty,
    value,
    onChange: (e) => {
      setValue(e.target.value);
      if (!e.target.value && required) setIsEmpty(true);
      else setIsEmpty(false);
    },
    required
  }
}


/**
 *
 * **/
export const useBgImg = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImg})`;

    return () => document.body.style.backgroundImage = 'none';
  }, [])
}