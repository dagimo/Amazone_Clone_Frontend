import React from 'react'

function Header() {
  return (
    <>
    <div>
        {/*logo*/}
        <a href="">
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
        </a>
        {/*delivery*/}
        <span>
            {/*icon*/}
        </span>
        <div>
            <p>Dekuvered to</p>
            <span>Ethiopia</span>
        </div>
    </div>
    <div>
        {/*search*/}
        <select name="" id="">
            <option value="">All</option>
        </select>
        <input type="text" name='' id='' placeholder='search product' />
        {/*icon */}
    </div>
    {/*right side link*/}
    <div>
        <img src="" alt="" />
        <section>
            <option value="">EN</option>
        </section>
    </div>
    </>

    
  )
}

export default Header