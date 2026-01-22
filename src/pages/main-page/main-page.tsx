type MainPageProps = {
  offersCount: number;
};

function MainPage({ offersCount }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1>Main page</h1>
        <p>{offersCount} places to stay</p>
      </main>
    </div>
  );
}

export default MainPage;
