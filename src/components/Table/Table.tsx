import React from "react";

interface TableProps {
  className: string;
  headers: string[];
  content: (string | JSX.Element)[][];
}

const Table = ({ className, headers, content }: TableProps): JSX.Element => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {headers.map((header: string, i: number) => (
            <th key={`header-${i}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((contentElements: (string | JSX.Element)[], i: number) => {
          return (
            <tr key={`contentElementRow-${i}`}>
              {contentElements.map(
                (contentElement: string | JSX.Element, j: number) => {
                  return <td key={`contentElement-${j}`}>{contentElement}</td>;
                }
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
