import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import Lottie from 'lottie-react'
import scanner from 'animations/scanner.json'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css'

import { Text } from 'components/atoms/Text'
import { Button } from 'components/molecules/Button'

import { getAttributes, ServerError } from 'services/api'

type dataProps = {
    trait_type: string
    value: string
}
type outputProps = {
    occurrence?: number
    trait_type?: string
    value?: string
}

export const Algo = () => {
    const [attributesLoading, setAttributesLoading] = useState<boolean>(false)
    const [attributes, setAttributes] = useState<dataProps[][]>()
    const [execTime, setExecTime] = useState<number>(0)
    const [occurrences, setOccurrences] = useState({})

    const fetchAttributes = async () => {
        try {
            setAttributesLoading(true)
            const response = await getAttributes()
            setAttributes(response.data)
            setAttributesLoading(false)

            return response.data
        } catch (error) {
            setAttributesLoading(false)
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerError>
                if (serverError?.response != null) {
                    toast.error(serverError.response.data.error)
                    return serverError.response.data
                }
            }
            return { errorMessage: 'server is down' }
        }
    }

    const applyAlgorithm = () => {
        // if we have no data from the backend don't do anything
        if (!attributes) return
        // Start counting execution time
        setExecTime(0)
        const start = Date.now()
        // Reset the data, if we have any from the previous execution
        setOccurrences([])
        /**
         * =================================================================
         *  PHASE 1: Flatten the nested array
         * =================================================================
         */
        // flatten the given nested array
        const flattened = attributes.flatMap(array => array)
        // Define the key to be used to extract the common field in the array
        const key: string = 'trait_type'

        /**
         * =================================================================
         *  PHASE 2: generate the matches based on key and value
         * =================================================================
         */

        /* initialize an empty Array based on outputProps
         * we will use this array to count the number of concurrency
         * based on the key and the value, if they are identical
         * we shall increment the occurrence field by 1
        */
        const array: outputProps[] = []

        flattened.forEach((x) => {
            // Checking if there is any object in array
            // which contains the key value
            if (array.some((val) => {
                return val[key] === x[key] && val.value === x.value
            })) {
                // If yes! then increase the occurrence by 1
                array.forEach((k) => {
                    if (k[key] === x[key] && k.value === x.value) {
                        k.occurrence++
                    }
                })
            } else {
                // If not! Then create a new object initialize
                // set the occurrence to 1
                const obj: outputProps = {}
                obj[key] = x[key]
                obj.value = x.value
                obj.occurrence = 1
                array.push(obj)
            }
        })

        /**
         * =================================================================
         *  PHASE 3: Reformat the data to matches the desired output
         * =================================================================
         */

        // initialize an empty object
        const output = {}
        // Generate a new key to matches the desired output
        array.forEach(element => {
            const key = `${element.trait_type}:${element.value}`
            output[key] = element.occurrence
        })
        // Fill the data with the final result
        setOccurrences(output)

        // Stop counting
        const timeTaken = Date.now() - start
        setExecTime(timeTaken)
    }

    useEffect(() => {
        const unsubscribe = fetchAttributes()
        return () => {
            void unsubscribe
        }
    }, [])

  return (
    <section className="p-12 flex flex-col">
          {
              attributesLoading
                  ? <div className='flex h-fit flex-1 justify-center items-center py-28'>
                      <Lottie animationData={scanner} loop style={{ width: 200, height: 200 }} />
                  </div>
                  : <div className="flex lg:flex-row flex-col justify-between items-center gap-10">
                      <div className="max-h-60 overflow-y-auto">
                          <JSONPretty data={attributes} space="4" style={{ fontSize: '1.1em' }} />
                      </div>
                      <div className="flex flex-col gap-3">
                          <Button label="Apply Algorithm" onPress={applyAlgorithm} />
                        <Text type="small">{`Total time taken : ${execTime} milliseconds`}</Text>
                      </div>
                      <JSONPretty data={occurrences} space="4" style={{ fontSize: '1.1em', minWidth: '30%' }} />
                  </div>
        }
    </section>
  )
}
