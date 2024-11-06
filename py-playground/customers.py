import math

customers: list[dict[str, str | int]] = [
    {'name': 'Alice', 'age': 25, 'email': 'alice@example.com'},
    {'name': 'Bob', 'age': 30, 'email': 'bob@example.com'},
    {'name': 'Charlie', 'age': 35, 'email': 'charlie@example.com'},
    {'name': 'David', 'age': 40, 'email': 'david@example.com'}
]

sum_age: int = 0
ages: list[int] = []
name_with_min_age: str = ""
email_with_max_age: str = ""

if __name__ == "__main__":
    for customer in customers:
        # print(customer)
        sum_age += int(customer.get("age"))
        ages.append(int(customer.get("age")))

    ages.sort()
    # print(ages) # [25, 30, 35, 40]
    for customer in customers:
        if customer.get("age") == ages[0]:
            name_with_min_age = customer.get("name")
        if customer.get("age") == ages[-1]:
            email_with_max_age = customer.get("email")

    print("所有客户年龄总和", sum_age)
    print("所有客户平均年龄", sum_age / len(customers))
    mid: int = math.floor((len(ages) - 1) / 2)
    print("所有客户年龄中位数", ages[mid])
    print("所有客户中年龄最大的客户邮箱", email_with_max_age)
    print("所有客户中年龄最小的客户姓名", name_with_min_age)
