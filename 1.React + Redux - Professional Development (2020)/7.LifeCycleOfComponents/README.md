###7. Life cycle of components 


MOUNTING
------
constructor() => render() => componentDidMount()


UPDATES
------
New Props
              => render() => componentDidUpdate(prevProps, prevState)
setState()


UNMOUNTING
------
componentWillUnmount()


ERROR
------
componentDidCatch()
