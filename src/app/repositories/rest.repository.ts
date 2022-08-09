interface Item {
    id: string;
}

interface RestRepositoryType<T extends Item, Response> {
    get: (id: string) => Promise<T>;
    getAll: () => Promise<Array<T>>;
    add: (item: Partial<T>) => Promise<T>;
    update: (item: Partial<T>) => Promise<T>;
    delete: (id: T['id']) => Promise<Response>;
}

export class RestRepository<T extends Item, Response>
    implements RestRepositoryType<T, Response>
{
    constructor(public url: string) {}

    get(id: string) {
        return fetch(this.url + id).then((response) => response.json());
    }

    async getAll() {
        const response = await fetch(this.url);
        return response.json();
    }

    add(item: Partial<T>) {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => response.json());
    }

    update(item: Partial<T>) {
        return fetch(this.url + item.id, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => response.json());
    }

    async delete(id: T['id']) {
        const result = await fetch(this.url + id, {
            method: 'DELETE',
        });
        return result as unknown as Promise<Response>;
    }
}
