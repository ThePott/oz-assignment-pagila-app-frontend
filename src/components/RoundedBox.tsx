import React from 'react'

const RoundedBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="m-3 p-3 rounded-xl border-1 border-amber-600">{children}</div>
    )
}

export default RoundedBox