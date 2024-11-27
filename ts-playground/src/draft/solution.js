try {
  throw new AggregateError(
    [new Error("www"), new Error("ttt"), new Error("fff")],
    "wtf",
  );
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // wtf
  console.log(e.name); // AggregateError
  console.log(e.errors); // [ Error: www, Error: ttt, Error: fff ]
}
