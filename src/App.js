import React, { useMemo, PureComponent, useState, useEffect, useRef, useCallback } from 'react';

// import About from './About';

function useCounter(count) {
	const size = useSize();
	return <h3>{count}--{size.height}*{size.width}
		</h3>
}
function useCount(defaultCount) {
	const [count, setCount] = useState(defaultCount);
	let it = useRef();

	useEffect(() => {
		it.current = setInterval(() => {
			setCount(count => count + 1);
		}, 1000);
	}, []);

	useEffect(() => {
		if (count > 3) {
			clearInterval(it.current);
		}
	});
	return [count, setCount];
}

function useSize() {
	const [size, setSize] = useState({
		width:	document.documentElement.clientWidth,
		height: document.documentElement.clientHeight
	});
	function resize() {
		setSize({
			width:	document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		})
	}
	useEffect(() => {
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
		}
	})
	return size;
}

function App() {
	const [count, setCount] = useCount(2);
	const Counter = useCounter(count);
	const size = useSize();
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Click({count}) {size.width} * {size.height}
			</button>
			{Counter}
		</div>
	)
}
export default App;
