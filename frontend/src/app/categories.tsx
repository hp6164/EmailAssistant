
interface Category {
  name: string;
  value: string;
}

interface CategoriesProps {
  categories: Category[]; // Prop to receive categories from the backend
}

export default function Categories() {
    return (
      <div className="bg-[var(--foreground)] p-[10px]">
        {/* Top div with no background color */}
        <div className="flex flex-col">
          <div className="flex gap-[10px]">
            {/* Left div with secondary background color */}
            <div className="bg-[var(--secondary)] flex-1 rounded-[8px] p-[30px]">
              <h3 className="text-center font-bold text-xl">Expecting Reply</h3>
              <ul>
                <li>[!] John Smith</li>
                <li>Jane Doe</li>
                <li>3rd Sender</li>
              </ul>
            </div>
            <div className="bg-[var(--background)] flex-1 rounded-[8px] p-[30px]">
              <h3 className="text-center font-bold text-xl">Summary</h3>
              <p> this is a sample summary of the most urgent email awaiting reply</p>
            </div>
          </div>
        </div>
        {/* Bottom div with foreground background color */}
        <div className="bg-[var(--background)] p-[10px] mt-2 rounded-[8px] flex gap-[10px]">
          <div className="bg-[var(--accent)] flex-1 p-[10px] rounded-[8px]">
            <h3 className="text-center font-bold text-xl">Categories</h3>
            <p> this is a sample summary of categorized emails</p>
          </div>
            <div className="flex-1 grid grid-cols-2 gap-[10px] pl-[10px] pr-[10px]">
              {/* Grid items */}
              <button className="bg-[var(--accent)] p-[10px] rounded-[8px]">Item 1</button>
              <button className="bg-[var(--accent)] p-[10px] rounded-[8px]">Item 2</button>
              <button className="bg-[var(--accent)] p-[10px] rounded-[8px]">Item 3</button>
              <button className="bg-[var(--accent)] p-[10px] rounded-[8px]">Item 4</button>
            </div>
          </div>
        </div>
  
    );
  }
  