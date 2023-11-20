import React from 'react';
import styles from './item-details.module.css';
import closeIcon from '../../assets/icon-close.png';
import { IItem } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Preloader from '../preloader/Preloader';
import { setCurrentItemShown } from '../../redux/slices/itemsSlice';

function ItemDetails() {
  const wasItemsLoaded = useAppSelector((state) => state.items.wasItemsLoaded);
  const wasCurrentItemLoaded = useAppSelector(
    (state) => state.items.wasCurrentItemLoaded
  );
  const item: IItem | null = useAppSelector(
    (state) => state.items.currentItemData
  );
  const dispatch = useAppDispatch();

  return !wasItemsLoaded && !wasCurrentItemLoaded ? (
    <Preloader />
  ) : (
    <article className={styles.itemDetails} data-testid="item-details">
      <ul>
        <li>Name: {item?.name}</li>
        <li>Year of Birth: {item?.birth_year}</li>
        <li>Gender: {item?.gender}</li>
        <li>Eye color: {item?.eye_color}</li>
        <li>Hair color: {item?.hair_color}</li>
      </ul>
      <img
        className={styles.closeIcon}
        onClick={() => dispatch(setCurrentItemShown(false))}
        src={closeIcon}
        alt="close"
        data-testid="details-close-button"
      />
    </article>
  );
}

export default ItemDetails;
