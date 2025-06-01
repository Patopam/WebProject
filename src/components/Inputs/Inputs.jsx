function Inputs({ type, placeholder, value, onChange }) {
	const styles = {
		input: {
			flex: 1,
			padding: '14px 18px',
			display: 'flex',
			alignItems: 'center',
			border: '1px solid #777777',
			borderRadius: '16px',
			fontSize: 'clamp(15px, 2.3vw, 17px)',
			fontFamily: 'Manrope, sans-serif',
			width: '100%',
			color: '#333333',
			backgroundColor: '#eef1fc',
		},
		div: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		},
	};
	return (
		<div className='input-container' style={styles.div}>
			<input style={styles.input} type={type} placeholder={placeholder} value={value} onChange={onChange} />
		</div>
	);
}
export default Inputs;
