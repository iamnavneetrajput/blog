import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle} from '@fortawesome/free-brands-svg-icons';

export default function OAuth() {
  return (
    <div>
      <button type="button"><FontAwesomeIcon icon={faGoogle} /> Google</button>
    </div>
  )
}
