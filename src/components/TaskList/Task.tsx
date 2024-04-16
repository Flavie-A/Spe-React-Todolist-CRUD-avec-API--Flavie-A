// import des icones-composants de react-feather
// on a installé le package avec la commande 'pnpm i react-feather'
import { Trash2, Edit, Check } from 'react-feather';

function Task() {
  return (
    <li className="item">
      <label className="item-label">
        <input className="item-checkbox" type="checkbox" />
        {/* <form className="item-form">
          <input type="text" />
          <button type="submit" className="item-delete">
            <Check />
          </button>
        </form> */}
        <span>faire les courses</span>
      </label>

      <button type="button" className="item-delete">
        <Trash2 />
      </button>

      <button type="button" className="item-delete">
        <Edit />
      </button>
    </li>
  );
}

export default Task;
