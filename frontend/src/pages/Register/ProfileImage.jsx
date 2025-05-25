function ProfileImage ({ file, onDragStartImage, onRemoveImage }) {
    return (
        <div
            className='mr-[24px] relative'
            draggable="true"
            onDragStart={(e) => onDragStartImage(e)}
            onDragEnd={() => onDragEnd()}
        >
            <img
            className="w-[200px] h-[200px] rounded-3xl object-cover"
            src={URL.createObjectURL(file)} alt={file.name} />
            <button className='image-remove-button text-white rounded-full -top-2 -right-2 h-9 w-9 absolute bg-pred-700 bg-opacity-90'
                onClick={() => onRemoveImage()}>x</button>
        </div>
    )
}

export default ProfileImage;