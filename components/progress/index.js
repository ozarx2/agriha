import { useState } from 'react';
import styles from './index.module.css'

const Progress = ({done}) => {
	const [style, setStyle] = useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
		<div className={styles.progress}>
			<div className={styles.progress-done
            } style={style}>
				{done}%
			</div>
		</div>
	)
}
export default Progress;