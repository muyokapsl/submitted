create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  tracking_id text unique not null,
  request_text text not null,
  email text null,
  status text not null default 'Submitted',
  checked_count integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists requests_tracking_id_idx on public.requests (tracking_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists requests_set_updated_at on public.requests;

create trigger requests_set_updated_at
before update on public.requests
for each row
execute function public.set_updated_at();

drop function if exists public.increment_checked_count(text);

create function public.increment_checked_count(request_tracking_id text)
returns setof public.requests as $$
begin
  return query
  update public.requests
  set checked_count = checked_count + 1
  where tracking_id = upper(request_tracking_id)
  returning *;
end;
$$ language plpgsql;
