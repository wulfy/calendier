export default function fetchComponentData(dispatch, components, params) {
	console.log("fetch:");

  const needs = components.reduce( (prev, current) => {

    return (current.needs || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
      .concat(prev);
    }, []);
  console.log(needs);
    const promises = needs.map(need => dispatch(need(params)));
    console.log("end fetch");
    return Promise.all(promises);
}