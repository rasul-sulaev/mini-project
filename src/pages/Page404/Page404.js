import {useBgImg, useTitle} from "../../utils/hooks";

export const Page404 = ({
  status = '404',
  statusText = 'Not found',
  message
}) => {
  /** Установка фоновой картинки на сайт **/
  useBgImg();

  /** Указываю название страницы в document.title **/
  useTitle('Страница не найдена');

  return (
    <section id="page404">
      {message ? (
        <p className="failed">Очень жаль... <br/>
          {message}
        </p>
      ) : (
        <>
          <h1 className="status-code">{status}</h1>
          <p className="status-text">{statusText + ' :('}</p>
        </>
      )}
    </section>
  )
}