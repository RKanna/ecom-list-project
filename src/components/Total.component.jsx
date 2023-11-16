const Total = ({ products }) => {
  const total = products.length;
  return (
    <div>
      <h4>Total:{total}</h4>
    </div>
  );
};

export default Total;
