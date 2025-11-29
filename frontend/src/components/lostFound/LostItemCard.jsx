

export default function LostItemCard({ item }) {
  

    return (
  

<div className="bg-neutral-primary-soft block max-w-sm p-6 border border-gray-400 border-default rounded-lg shadow-xs">
       <a href="/:id">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-heading">{item.itemName}</h5>
    </a>
    <p className="mb-3 text-body">Location : {item.location}</p>
     <p className="mb-3 text-body">{item.description}</p>
     {item.status=='lost' && <p className="text-red-600 font-semibold">Lost</p>}
     <p className="mb-3 text-body"> Date : {item.date}</p>
</div>

  );
}
