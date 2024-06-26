import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <li className='item'>
        <a className='cards__item__link' href={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label} >
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info' >
          <h5 className='cards__item__title'>{props.title}</h5>
          <h5 className='cards__item__subtitle'>{props.subtitle}</h5>
            <h5 className='cards__item__text'>{props.text}</h5>
           
            

          </div>
        </a>
      </li>
    </>
  );
}

export default CardItem;