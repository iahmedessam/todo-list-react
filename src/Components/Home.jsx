import React, { useEffect, useState } from 'react'

export default function Home() {
    const [inputValue, setInputValue] = useState('')
    const [valueArray, setValueArray] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    function handleAdd() {
        if (inputValue.trim() !== '') {
            if (editIndex === null) {
                // Adding a new item
                const toDo = {
                    text: inputValue,
                    bgColor: randomColor(),
                }
                setValueArray((prev) => [...prev, toDo])
            } else {
                // Editing an existing item
                const updatedArray = [...valueArray]
                updatedArray[editIndex].text = inputValue
                setValueArray(updatedArray)
                setEditIndex(null)
            }
            setInputValue('')
        }
    }

    function handleEdit(index) {
        setEditIndex(index)
        setInputValue(valueArray[index].text)
    }

    function handleDelete(index) {
        setValueArray((prev) => prev.filter((_, i) => i !== index))
        setEditIndex(null) // Clear edit mode on delete
    }

    function handleBlurEdit(index) {
        // Save the edited value on blur
        if (editIndex !== null && editIndex === index) {
            handleAdd()
        }
    }

    function randomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    }

    return (
        <>
            <main>
                <h1 id='header'>Do it Now</h1>

                <section id='firstSection'>
                    <input
                        id='input'
                        value={inputValue}
                        onChange={(e) => handleChange(e)}
                        onBlur={() => handleBlurEdit(editIndex)}
                        placeholder="What's the task"
                    />
                    {/* Add & Save buttons */}
                    <button id='addBtn' onClick={() => handleAdd()} type='button'>
                        {editIndex === null ? 'Add' : 'Save'}
                    </button>
                </section>

                {valueArray.map((e, index) => (
                    <section key={index} id='seconedSection'>
                        {/* Random Background */}
                        <div style={{ backgroundColor: e.bgColor }} id='items'>
                            <p id='text'>{e.text}</p>
                            {/* Edit & Delete buttons */}
                            <div id='btns'>
                                {/* Edit button */}
                                <svg
                                    id='editBtn'
                                    onClick={() => handleEdit(index)}
                                    fill='white'
                                    width='18'
                                    height='18'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 1000 1000' >
                                    <path d="M978.3,190.7l-84.5-84.5l-84.5-84.5c-15.6-15.6-40.8-15.6-56.3,0L53.6,721.1c-3,3-4.9,6.8-5.6,10.9L10.3,966.9c-1,6.3,1.1,12.7,5.6,17.2c4.5,4.5,10.9,6.6,17.2,5.6L268,952c4.1-0.7,8-2.6,10.9-5.6L978.3,247C993.9,231.4,993.9,206.2,978.3,190.7z M232.1,908.7L87.3,935.9c-6.5,1.2-13.1-0.8-17.8-5.5c-4.6-4.6-6.7-11.3-5.5-17.8l27.2-144.7l549.1-549.1l140.8,140.8L232.1,908.7z M907.9,232.9l-98.6,98.6L668.6,190.6l98.6-98.6c7.8-7.8,20.4-7.8,28.2,0l56.9,56.9l55.8,55.8C915.7,212.5,915.7,225.1,907.9,232.9z"></path>
                                </svg>
                                {/* Delete button */}
                                <svg
                                    id='deleteBtn'
                                    onClick={() => handleDelete(index)}
                                    fill='white'
                                    width='18'
                                    height='18'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 1000 1000'>
                                    <path d="M220,185h700c19.4,0,35,15.6,35,35c0,19.4-15.6,35-35,35H80c-19.4,0-35-15.6-35-35s15.6-35,35-35H220"></path><path d="M605,745c-19.4,0-35-15.6-35-35V360c0-19.4,15.6-35,35-35s35,15.6,35,35v350C640,729.4,624.4,745,605,745z"></path><path d="M395,745c-19.4,0-35-15.6-35-35V360c0-19.4,15.6-35,35-35s35,15.6,35,35v350C430,729.4,414.4,745,395,745z"></path><path d="M255,220h-70V115c0-57.9,47.1-105,105-105h385.8c57.9,0,105,47.1,105,105v105h-70V115c0-19.3-15.7-35-35-35H290c-19.3,0-35,15.7-35,35V220z"></path><path d="M745.1,990H255.1c-57.9,0-105-47.1-105-105V359.5c0-19.3,15.7-35,35-35c19.3,0,35,15.7,35,35V885c0,19.3,15.7,35,35,35h490.1c19.3,0,35-15.7,35-35V360.9c0-19.3,15.6-35,35-35c19.4,0,35,15.7,35,35V885C850.1,942.9,803,990,745.1,990z"></path>
                                </svg>
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </>
    )
}
