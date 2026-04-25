-- Add Offplan as a first-class listing tag option used by /new-developments.
insert into public.property_listing_tags (name, sort_order)
values ('Offplan', 20)
on conflict (name) do nothing;

