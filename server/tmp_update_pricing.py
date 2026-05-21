from pathlib import Path
import re

path = Path('src/services/audit/pricing/pricingData.ts')
text = path.read_text(encoding='utf-8')
lines = text.splitlines()
out = []
in_plans = False
obj_depth = 0
current_plan_name = None
current_plan_has_is_production = False

for line in lines:
    stripped = line.strip()
    if not in_plans and stripped.startswith('plans:') and stripped.endswith('['):
        in_plans = True
        out.append(line)
        continue
    if in_plans:
        open_braces = line.count('{')
        close_braces = line.count('}')
        if open_braces > 0 and obj_depth == 0:
            current_plan_name = None
            current_plan_has_is_production = False
        obj_depth += open_braces
        if stripped.startswith('name:'):
            plan_name = stripped.split(':', 1)[1].strip().rstrip(',').strip().strip('"')
            current_plan_name = plan_name
        if stripped.startswith('isProductionReady:'):
            current_plan_has_is_production = True
        if stripped.startswith('pricingType:') and not current_plan_has_is_production:
            plan_name = current_plan_name or ''
            is_free = bool(re.search(r'\b(free|hobby)\b', plan_name, re.I))
            value = 'false' if is_free else 'true'
            out.append(line)
            indent = line[:line.index('p')]
            out.append(f'{indent}isProductionReady: {value},')
            current_plan_has_is_production = True
            continue
        out.append(line)
        obj_depth -= close_braces
        if obj_depth == 0 and stripped in ('],', ']'):
            in_plans = False
        continue
    out.append(line)

new_text = '\n'.join(out) + ('\n' if text.endswith('\n') else '')
path.write_text(new_text, encoding='utf-8')
print('updated pricingData.ts')
