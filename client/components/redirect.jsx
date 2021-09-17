import { useHistory } from 'react-router-dom';

export default function Redirect(props) {
  const history = useHistory();
  if (props.to === '') {
    history.push('/');
  } else {
    history.push(props.to);
  }
}
