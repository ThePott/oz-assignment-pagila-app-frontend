import React from 'react'

const RoundedBox = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const {children, ...rest} = props
    return (
        <div {...rest} className="m-3 p-3 rounded-xl border-1 border-amber-600">{children}</div>
    )
}

export default RoundedBox