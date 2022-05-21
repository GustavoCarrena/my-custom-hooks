import { useEffect, useRef, useState } from "react"


export const useFetch = (url) => {
/*
    *   Por defecto está montado porque se renderiza por primera vez
    *   La idea de useRef es que mantenga la referencia cuando el hook esta vivo o cuando el 
        componente que lo usa sigue montado.
    *   Cuando cambie los valores de isMounted, no quiero lanzar una renderizacion nuevamente del
        componente. Solamente estoy manteniendo la referencia al valor.
*/
    const isMounted = useRef(true); 

    const [state, setState] = useState({
        data: null, 
        loading: true, 
        error: null
    });

    useEffect( () => {
        
        /*Return: es la fase de limpieza (En este caso, cuando se desmonte el componente)*/
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(()=>{
        setState({ data: null, loading: true, error: null});
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                    if (isMounted.current === true) {
                        setState({
                            loading: false,
                            error: null,
                            data: data
                        });
                    }
            });
    },[url]);
    return state;   
};
