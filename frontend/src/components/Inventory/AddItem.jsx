
import ItemForm from "./ItemForm"
import Sidebar from './Navbar';

const AddItems = () => {
  return (
    <div> <Sidebar/>
    <div className="add-items">
    
      <ItemForm />
    </div>
    </div>
  );
};

export default AddItems;