// function Demo({
//     count,
//     increment,
//     decrement,
//     reset,
//     isResetClicked,
//     incValue,
//     decValue,
//     setIncValue,
//     setDecValue,
//     handleAdd
// }) {
//     return (
//         <div className="container">

//             <h2>Counter App</h2>

//             <input
//                 type="text"
//                 placeholder="Increment value"
//                 value={incValue}
//                 onChange={(e) => setIncValue(e.target.value)}
//             />

//             <input
//                 type="text"
//                 placeholder="Decrement value"
//                 value={decValue}
//                 onChange={(e) => setDecValue(e.target.value)}
//             />

//             <p className="count">Count: {count}</p>

//             <div className="btn-group">
//                 <button className="btn increment" onClick={increment}>
//                     Increment
//                 </button>

//                 <button
//                     className="btn decrement"
//                     onClick={decrement}
//                     disabled={count === 0}
//                 >
//                     Decrement
//                 </button>

//                 <button
//                     className="btn reset"
//                     onClick={reset}
//                     style={{ backgroundColor: isResetClicked ? "greenyellow" : "" }}
//                 >
//                     Reset
//                 </button>
//             </div>

//             <button className="btn add" onClick={handleAdd}>
//                 Add
//             </button>

//         </div>
//     );
// }

// export default Demo;