export default function AboutProject() {
  return (
    <div className='about'>
      <div className='about__container'>
        <h2 className='title-block'>О проекте</h2>
        <div className='about__two-columns'>
          <div className='about__wrapper'>
            <h3 className='about__column-title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about__column-subtitle'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className='about__wrapper'>
            <h3 className='about__column-title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about__column-subtitle'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='about__duration'>
          <p className='about__week about__week_style_green'>1 неделя</p>
          <p className='about__week about__week_style_grey'>4 недели</p>
          <p className='about__prog-way'>Back-end</p>
          <p className='about__prog-way'>Front-end</p>
        </div>
      </div>
    </div>
  );
}
