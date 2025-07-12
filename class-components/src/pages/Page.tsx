import { Component, type ReactNode } from 'react';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import type { MainState } from '../types/data';
import CardList from '../components/cardList/CardList';
import ErrorButton from '../components/errorButton/ErrorButton';
import './page.css';

class Page extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
      query: '',
      isLoading: false,
      isError: false,
      errorMessage: '',
      isMockError: false,
    };
  }

  componentDidMount(): void {
    this.queryChange('');
  }

  queryChange = async (query: string) => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://zelda.fanapis.com/api/characters?name=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          this.setState({
            errorMessage: `Client error ${response.status} - ${response.statusText}`,
          });
        } else if (response.status >= 500) {
          this.setState({
            errorMessage: `Server error ${response.status} - ${response.statusText}`,
          });
        }
        this.setState({ isLoading: false, isError: true });
      }
      const result = await response.json();
      console.log(result);

      this.setState({ data: result.data, isLoading: false });
    } catch {
      this.setState({ isLoading: true });
      // if (error) this.setState({ isError: true });
    }
  };

  errorGenerate = (): void => {
    this.setState({ isMockError: true });
  };

  render(): ReactNode {
    if (this.state.isMockError) {
      throw new Error('This is mock');
    }
    return (
      <div className="page-wrapper">
        <Header title="Zelda monsters store" />
        <Search onQueryChange={this.queryChange} />

        <CardList
          data={this.state.data}
          isLoading={this.state.isLoading}
          isError={this.state.isError}
          errorMessage={this.state.errorMessage}
        ></CardList>

        <ErrorButton onErrorGenerate={this.errorGenerate} />
      </div>
    );
  }
}
export default Page;
