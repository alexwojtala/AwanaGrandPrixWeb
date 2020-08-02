import React from 'react';

interface TableProps {
    headers: string[],
    content: string[][]
}

const Table = ({headers, content}: TableProps) => {
    return (
    <table className={'nextRace'}>
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
                                console.log(contentElement)
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