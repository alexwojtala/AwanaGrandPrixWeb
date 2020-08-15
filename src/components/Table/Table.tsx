import React from 'react';

interface TableProps {
    className: string,
    headers: string[],
    content: (string | JSX.Element)[][]
}

const Table = ({className, headers, content}: TableProps) => {
    return (
    <table className={className}>
          <thead>
            <tr>
                {headers.map(header => <th>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            
                {content.map(contentElements => {
                    return (
                        <tr>
                        {
                            contentElements.map(contentElement => {
                                return <td>{contentElement}</td>
                            })
                        }
                        </tr>
                    )
                })}
          </tbody>
        </table>
    );
}

export default Table;