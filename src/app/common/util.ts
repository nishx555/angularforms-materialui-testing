import { Observable } from "rxjs";

export function createHttpObservable(url: string) {
  return Observable.create((observer) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });

    // We can return a function from this observable which will
    // get executed when you unsubscribe() the main observable in the caller
    return () => controller.abort();
  });
}
