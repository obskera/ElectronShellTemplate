import React, { useState } from 'react'



const TortoisShell = () => {
    //shells that hold data in the store
    interface DataShell {
        key: string,
        value: string
    }
    //store all data
    const [data, setData] = useState([{key: "default", value: "n/a"}])

    //loop through data to find and return datashell that matches key from data
    function getShellData(key: string): DataShell {
        let store: DataShell;
        for (let i = 0; i < data.length; i++) {
            if (data[i].key === key) {
                store = data[i]
                return store
            }
        }
        return {key: "Invalid", value: "Key"}
    }

    function addShellData(shell: DataShell): void {
        let store = data
        store.push(shell)
        setData(store)
    }
    

  return (
    <div>TortoisShell</div>
  )
}

export default TortoisShell