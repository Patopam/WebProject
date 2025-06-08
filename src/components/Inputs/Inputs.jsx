import { useState, useEffect, useState as ReactUseState } from 'react';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

function Inputs({ type, placeholder, value, onChange }) {
	const [showPassword, setShowPassword] = useState(false);
	const isPassword = type === 'password';
	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

	const [isLargeMobile, setIsLargeMobile] = ReactUseState(false);
	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 430px)');
		setIsLargeMobile(mediaQuery.matches);
		mediaQuery.addEventListener('change', (e) => setIsLargeMobile(e.matches));
	}, []);

	const styles = {
		wrapper: {
			position: 'relative',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
		},
		input: {
			flex: 1,
			padding: isPassword
				? isLargeMobile
					? '18px 52px 18px 20px'
					: '14px 48px 14px 18px'
				: isLargeMobile
				? '18px 20px'
				: '14px 18px',
			border: '1px solid #777777',
			borderRadius: '16px',
			fontSize: 'clamp(15px, 2.3vw, 17px)',
			fontFamily: 'Manrope, sans-serif',
			width: '100%',
			color: '#333333',
			backgroundColor: '#eef1fc',
		},
		icon: {
			position: 'absolute',
			right: '12px',
			cursor: 'pointer',
			color: '#666666',
		},
	};

	return (
		<div className='input-container' style={styles.wrapper}>
			<input style={styles.input} type={inputType} placeholder={placeholder} value={value} onChange={onChange} />
			{isPassword && (
				<span onClick={() => setShowPassword(!showPassword)} style={styles.icon}>
					{showPassword ? <VisibilityOffRoundedIcon /> : <RemoveRedEyeRoundedIcon />}
				</span>
			)}
		</div>
	);
}
export default Inputs;
