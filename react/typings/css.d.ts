declare module '*.css' {
    type Styles = {
      [selector: string]: string
    }
  
    const styles: Styles
  
    export default styles
  }


  declare module '@vtex/styleguide';


  declare module '@vtex/styleguide/lib/Spinner'